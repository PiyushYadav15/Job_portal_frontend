from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from .models import (
    JobPosting,
    Application,
    SavedJob,
)

from .serializers import (
    JobPostingSerializer,
    ApplicationSerializer,
    ApplyJobSerializer,
    MyApplicationSerializer,
    SavedJobSerializer,
    EmployerDashboardSerializer,
)

from accounts.permissions import (
    IsEmployer,
    IsJobSeeker,
    IsEmployerOrReadOnly,
)


# ==========================================
# Employer Dashboard
# ==========================================

class EmployerDashboardAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsEmployer,
    ]

    def get(self, request):

        jobs = JobPosting.objects.filter(
            employer=request.user
        )

        applications = Application.objects.filter(
            job__employer=request.user
        )

        return Response({

            "total_jobs": jobs.count(),

            "total_applications": applications.count(),

            "pending_review": applications.filter(
                status="pending"
            ).count(),

            "accepted": applications.filter(
                status="accepted"
            ).count(),

            "rejected": applications.filter(
                status="rejected"
            ).count(),

        })


# ==========================================
# Employer Job CRUD
# ==========================================

class JobPostingViewSet(viewsets.ModelViewSet):

    serializer_class = JobPostingSerializer

    permission_classes = [
        IsAuthenticated,
        IsEmployerOrReadOnly,
    ]

    def get_queryset(self):

        user = self.request.user

        if user.is_authenticated and user.role == "employer":

            return JobPosting.objects.filter(
                employer=user
            ).order_by("-created_at")

        return JobPosting.objects.all().order_by(
            "-created_at"
        )

    def perform_create(self, serializer):

        serializer.save(
            employer=self.request.user
        )

    @action(
        detail=True,
        methods=["get"],
    )
    def applications(self, request, pk=None):

        job = self.get_object()

        if job.employer != request.user:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        queryset = Application.objects.filter(
            job=job
        ).select_related(
            "applicant",
            "job",
        )

        serializer = ApplicationSerializer(
            queryset,
            many=True,
        )

        return Response(serializer.data)
    

# ==========================================
# Employer Manage Applications
# ==========================================

class ApplicationViewSet(viewsets.ModelViewSet):

    serializer_class = ApplicationSerializer

    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):

        user = self.request.user

        if user.role == "employer":

            return Application.objects.filter(
                job__employer=user
            ).select_related(
                "job",
                "applicant",
            )

        return Application.objects.filter(
            applicant=user
        ).select_related(
            "job",
            "job__employer",
        )

    def perform_create(self, serializer):

        serializer.save(
            applicant=self.request.user
        )

    @action(detail=True, methods=["patch"])
    def accept(self, request, pk=None):

        application = self.get_object()

        if application.job.employer != request.user:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        application.status = "accepted"

        application.save()

        return Response(
            {
                "message":
                "Application accepted successfully."
            }
        )

    @action(detail=True, methods=["patch"])
    def reject(self, request, pk=None):

        application = self.get_object()

        if application.job.employer != request.user:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        application.status = "rejected"

        application.save()

        return Response(
            {
                "message":
                "Application rejected successfully."
            }
        )

    @action(detail=True, methods=["patch"])
    def review(self, request, pk=None):

        application = self.get_object()

        if application.job.employer != request.user:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        application.status = "reviewing"

        application.save()

        return Response(
            {
                "message":
                "Application moved to review."
            }
        )

# ==========================================
# Job List API
# ==========================================

class JobListAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):

        jobs = JobPosting.objects.all().order_by(
            "-created_at"
        )

        serializer = JobPostingSerializer(
            jobs,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)
    

# ==========================================
# Job Detail API
# ==========================================

class JobDetailAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request, pk):

        job = get_object_or_404(
            JobPosting,
            pk=pk
        )

        serializer = JobPostingSerializer(
            job,
            context={"request": request},
        )

        return Response(serializer.data)
    
# ==========================================
# Apply Job API
# ==========================================

class ApplyJobAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def post(self, request, pk):

        job = get_object_or_404(
            JobPosting,
            pk=pk
        )

        serializer = ApplyJobSerializer(
            data=request.data,
            context={
                "request": request,
                "job": job,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            {
                "message":
                "Application submitted successfully."
            },
            status=status.HTTP_201_CREATED,
        )

# ==========================================
# My Applications
# ==========================================

class MyApplicationsAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def get(self, request):

        applications = (
            Application.objects.filter(
                applicant=request.user
            )
            .select_related(
                "job",
                "job__employer",
            )
            .order_by("-applied_at")
        )

        serializer = MyApplicationSerializer(
            applications,
            many=True,
        )

        return Response(serializer.data)
    

# ==========================================
# Withdraw Application
# ==========================================

class WithdrawApplicationAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def delete(self, request, pk):

        application = get_object_or_404(
            Application,
            pk=pk,
            applicant=request.user,
        )

        application.delete()

        return Response(
            {
                "message":
                "Application withdrawn successfully."
            },
            status=status.HTTP_200_OK,
        )
    
# ==========================================
# Save Job
# ==========================================

class SaveJobAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def post(self, request, pk):

        job = get_object_or_404(
            JobPosting,
            pk=pk,
        )

        saved_job, created = SavedJob.objects.get_or_create(
            job=job,
            user=request.user,
        )

        if created:

            return Response(
                {
                    "message": "Job saved successfully."
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "message": "Job already saved."
            },
            status=status.HTTP_200_OK,
        )
    
# ==========================================
# Unsave Job
# ==========================================

class UnsaveJobAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def delete(self, request, pk):

        saved_job = SavedJob.objects.filter(
            job_id=pk,
            user=request.user,
        )

        if not saved_job.exists():

            return Response(
                {
                    "message": "Saved job not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        saved_job.delete()

        return Response(
            {
                "message": "Job removed from saved jobs."
            },
            status=status.HTTP_200_OK,
        )
    
# ==========================================
# Saved Jobs
# ==========================================

class SavedJobsAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def get(self, request):

        saved_jobs = (
            SavedJob.objects.filter(
                user=request.user
            )
            .select_related(
                "job",
                "job__employer",
            )
            .order_by("-saved_at")
        )

        serializer = SavedJobSerializer(
            saved_jobs,
            many=True,
            context={
                "request": request,
            },
        )

        return Response(serializer.data)
    
# ==========================================
# Job Seeker Dashboard
# ==========================================

class JobSeekerDashboardAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsJobSeeker,
    ]

    def get(self, request):

        applications = Application.objects.filter(
            applicant=request.user
        )

        saved_jobs = SavedJob.objects.filter(
            user=request.user
        )

        latest_jobs = JobPosting.objects.exclude(
            employer=request.user
        ).order_by("-created_at")[:5]

        data = {

            "total_applications": applications.count(),

            "saved_jobs": saved_jobs.count(),

            "accepted": applications.filter(
                status="accepted"
            ).count(),

            "rejected": applications.filter(
                status="rejected"
            ).count(),

            "pending": applications.filter(
                status="pending"
            ).count(),

            "reviewing": applications.filter(
                status="reviewing"
            ).count(),

            "shortlisted": applications.filter(
                status="shortlisted"
            ).count(),

            "recent_applications": MyApplicationSerializer(
                applications.order_by("-applied_at")[:5],
                many=True,
            ).data,

            "saved_jobs_list": SavedJobSerializer(
                saved_jobs.order_by("-saved_at")[:5],
                many=True,
                context={
                    "request": request,
                },
            ).data,

            "recommended_jobs": JobPostingSerializer(
                latest_jobs,
                many=True,
                context={
                    "request": request,
                },
            ).data,
        }

        return Response(data)

