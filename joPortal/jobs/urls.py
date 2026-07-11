from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    JobPostingViewSet,
    ApplicationViewSet,
    EmployerDashboardAPIView,

    JobSeekerDashboardAPIView,   

    JobListAPIView,
    JobDetailAPIView,
    ApplyJobAPIView,
    MyApplicationsAPIView,
    WithdrawApplicationAPIView,
    SaveJobAPIView,
    UnsaveJobAPIView,
    SavedJobsAPIView,
)

router = DefaultRouter()

router.register(
    "employer/jobs",
    JobPostingViewSet,
    basename="employer-jobs"
)

router.register(
    "employer/applications",
    ApplicationViewSet,
    basename="employer-applications"
)

urlpatterns = [

    # ==========================
    # Employer APIs
    # ==========================

    path(
        "employer/dashboard/",
        EmployerDashboardAPIView.as_view(),
        name="employer-dashboard",
    ),

    # ==========================
    # Job Seeker APIs
    # ==========================
     # Job Seeker Dashboard

     path(
        "dashboard/jobseeker/",
        JobSeekerDashboardAPIView.as_view(),
        name="jobseeker-dashboard",
    ),
    path(
        "jobs/",
        JobListAPIView.as_view(),
        name="job-list",
    ),

    path(
        "jobs/<int:pk>/",
        JobDetailAPIView.as_view(),
        name="job-detail",
    ),

    path(
        "jobs/<int:pk>/apply/",
        ApplyJobAPIView.as_view(),
        name="apply-job",
    ),

    path(
        "jobs/<int:pk>/save/",
        SaveJobAPIView.as_view(),
        name="save-job",
    ),

    path(
        "jobs/<int:pk>/unsave/",
        UnsaveJobAPIView.as_view(),
        name="unsave-job",
    ),

    path(
        "saved-jobs/",
        SavedJobsAPIView.as_view(),
        name="saved-jobs",
    ),

    path(
        "my-applications/",
        MyApplicationsAPIView.as_view(),
        name="my-applications",
    ),

    path(
        "applications/<int:pk>/withdraw/",
        WithdrawApplicationAPIView.as_view(),
        name="withdraw-application",
    ),
]


urlpatterns += router.urls