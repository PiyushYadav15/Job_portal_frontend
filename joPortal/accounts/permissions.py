from rest_framework.permissions import BasePermission


class IsEmployer(BasePermission):

    message = "Only employers can perform this action."

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "employer"
        )


class IsJobSeeker(BasePermission):

    message = "Only job seekers can perform this action."

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "job_seeker"
        )


class IsEmployerOrReadOnly(BasePermission):

    message = "Only employers can modify jobs."

    def has_permission(self, request, view):

        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        return (
            request.user.is_authenticated
            and request.user.role == "employer"
        )