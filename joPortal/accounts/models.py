from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    EMPLOYER = "employer"
    SEEKER = "job_seeker"

    ROLE_CHOICES = [
        (EMPLOYER, "Employer"),
        (SEEKER, "job_seeker"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=SEEKER,
    )

    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.username} ({self.role})"