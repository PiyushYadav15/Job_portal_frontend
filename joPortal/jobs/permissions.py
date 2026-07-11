from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsEmployerOrReadOnly(BasePermission):
    """
    Anyone can view jobs.
    Only employers can create, update, or delete jobs.
    """

    def has_permission(self, request, view):

        # Anyone can view
        if request.method in SAFE_METHODS:
            return True

        # Must be authenticated
        if not request.user.is_authenticated:
            return False

        # Only employers
        return request.user.role == "employer"

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        # Only the owner employer can edit/delete
        return (
            request.user.role == "employer"
            and obj.employer == request.user
        )