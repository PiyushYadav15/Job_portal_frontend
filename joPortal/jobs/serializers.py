from rest_framework import serializers
from .models import JobPosting, Application, SavedJob


# ==========================================================
# Job Posting
# ==========================================================

class JobPostingSerializer(serializers.ModelSerializer):

    employer_name = serializers.CharField(
        source="employer.username",
        read_only=True
    )

    class Meta:
        model = JobPosting
        fields = (
            "id",
            "title",
            "description",
            "location",
            "salary_min",
            "salary_max",
            "employment_type",
            "employer_name",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "employer_name",
            "created_at",
            "updated_at",
        )

# ======================================================
# Apply Job Serializer
# ======================================================

class ApplyJobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = (
            "cover_letter",
            "resume",
        )

    def validate(self, attrs):

        request = self.context["request"]
        job = self.context["job"]

        # Only job seekers can apply
        if request.user.role != "job_seeker":
            raise serializers.ValidationError(
                "Only job seekers can apply for jobs."
            )

        # Cannot apply to own job
        if job.employer == request.user:
            raise serializers.ValidationError(
                "You cannot apply to your own job."
            )

        # Already applied
        if Application.objects.filter(
            job=job,
            applicant=request.user
        ).exists():

            raise serializers.ValidationError(
                "You have already applied for this job."
            )

        return attrs

    def create(self, validated_data):

        request = self.context["request"]
        job = self.context["job"]

        application = Application.objects.create(
            job=job,
            applicant=request.user,
            cover_letter=validated_data["cover_letter"],
            resume=validated_data["resume"],
        )

        return application
# ==========================================================
# Job Application
# ==========================================================

class ApplicationSerializer(serializers.ModelSerializer):

    applicant = serializers.CharField(
        source="applicant.username",
        read_only=True
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    employer_name = serializers.CharField(
        source="job.employer.username",
        read_only=True
    )

    class Meta:
        model = Application

        fields = (
            "id",
            "job",
            "job_title",
            "employer_name",
            "applicant",
            "cover_letter",
            "resume",
            "status",
            "applied_at",
        )

        read_only_fields = (
            "id",
            "applicant",
            "status",
            "applied_at",
        )


# ==========================================================
# Employer Dashboard
# ==========================================================

class EmployerDashboardSerializer(serializers.ModelSerializer):

    applicants = serializers.SerializerMethodField()

    class Meta:
        model = JobPosting

        fields = (
            "id",
            "title",
            "location",
            "salary_min",
            "salary_max",
            "created_at",
            "applicants",
        )

    def get_applicants(self, obj):
        return obj.applications.count()


# ==========================================================
# My Applications
# ==========================================================

class MyApplicationSerializer(serializers.ModelSerializer):

    job = serializers.IntegerField(
        source="job.id",
        read_only=True,
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True,
    )

    company_name = serializers.CharField(
        source="job.employer.username",
        read_only=True,
    )

    location = serializers.CharField(
        source="job.location",
        read_only=True,
    )

    salary = serializers.SerializerMethodField()

    job_type = serializers.CharField(
        source="job.employment_type",
        read_only=True,
    )

    class Meta:
        model = Application

        fields = (
            "id",
            "job",
            "job_title",
            "company_name",
            "location",
            "salary",
            "job_type",
            "status",
            "resume",
            "cover_letter",
            "applied_at",
        )

    def get_salary(self, obj):
        return f"₹{obj.job.salary_min} - ₹{obj.job.salary_max}"

# ==========================================================
# Saved Jobs
# ==========================================================

class SavedJobSerializer(serializers.ModelSerializer):

    job = JobPostingSerializer(read_only=True)

    class Meta:
        model = SavedJob

        fields = (
            "id",
            "job",
            "saved_at",
        )


# ==========================================================
# Job Seeker Dashboard
# ==========================================================

class JobSeekerDashboardSerializer(serializers.Serializer):

    total_applications = serializers.IntegerField()

    saved_jobs = serializers.IntegerField()

    accepted = serializers.IntegerField()

    rejected = serializers.IntegerField()

    pending = serializers.IntegerField()

    reviewing = serializers.IntegerField()

    shortlisted = serializers.IntegerField()

    recent_applications = MyApplicationSerializer(
        many=True
    )

    saved_jobs_list = SavedJobSerializer(
        many=True
    )

    recommended_jobs = JobPostingSerializer(
        many=True
    )