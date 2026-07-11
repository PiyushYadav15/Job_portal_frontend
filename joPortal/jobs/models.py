from django.conf import settings
from django.db import models


class JobPosting(models.Model):

    EMPLOYMENT_TYPES = [
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("contract", "Contract"),
        ("internship", "Internship"),
        ("remote", "Remote"),
    ]

    employer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="job_postings",
        limit_choices_to={"role": "employer"},
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    location = models.CharField(max_length=255)

    salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    employment_type = models.CharField(
        max_length=20,
        choices=EMPLOYMENT_TYPES,
        default="full_time"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Application(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("reviewing", "Reviewing"),
        ("shortlisted", "Shortlisted"),
        ("rejected", "Rejected"),
        ("accepted", "Accepted"),
    ]

    job = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        related_name="applications",
    )

    applicant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications",
        limit_choices_to={"role": "job_seeker"},
    )

    cover_letter = models.TextField()

    resume = models.FileField(
        upload_to="applications/resumes/",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("job", "applicant")
        ordering = ["-applied_at"]

    def __str__(self):
        return f"{self.applicant.username} → {self.job.title}"


class SavedJob(models.Model):

    job = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        related_name="saved_jobs",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_jobs",
        limit_choices_to={"role": "job_seeker"},
    )

    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("job", "user")
        ordering = ["-saved_at"]

    def __str__(self):
        return f"{self.user.username} saved {self.job.title}"