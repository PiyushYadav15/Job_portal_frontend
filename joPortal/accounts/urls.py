from django.urls import path
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)

from .views import (
    RegisterView,
    ProfileAPIView,
    ChangePasswordAPIView,
    DeleteAccountAPIView,
    LoginAPIView,
    MeAPIView,
    LogoutAPIView,

)

urlpatterns = [

    # Authentication
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view()),



    path("logout/", LogoutAPIView.as_view()),

    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Profile
    path("me/", ProfileAPIView.as_view(), name="profile"),

    # Account
    path(
        "change-password/",
        ChangePasswordAPIView.as_view(),
        name="change_password",
    ),
    path(
        "delete-account/",
        DeleteAccountAPIView.as_view(),
        name="delete_account",
    ),
]