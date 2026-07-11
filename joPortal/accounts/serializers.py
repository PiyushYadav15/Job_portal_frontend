from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


# =====================================================
# Register Serializer
# =====================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    confirm_password = serializers.CharField(
        write_only=True,
        required=True
    )

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "role",
            "password",
            "confirm_password",
        )

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate_role(self, value):

        if value not in ["employer", "job_seeker"]:
            raise serializers.ValidationError("Invalid role.")

        return value

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password":
                "Passwords do not match."
            })

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user


# =====================================================
# Profile Serializer
# =====================================================

class ProfileSerializer(serializers.ModelSerializer):

    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            "resume",
        )

        read_only_fields = (
            "id",
            "role",
        )

    def get_role(self, obj):

        if obj.role == "job_seeker":
            return "job_seeker"

        return obj.role


# =====================================================
# Change Password
# =====================================================

class ChangePasswordSerializer(serializers.Serializer):

    current_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):

        user = self.context["request"].user

        if not user.check_password(
            attrs["current_password"]
        ):
            raise serializers.ValidationError({
                "current_password":
                "Current password is incorrect."
            })

        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password":
                "Passwords do not match."
            })

        validate_password(
            attrs["new_password"],
            user
        )

        return attrs


# =====================================================
# Delete Account
# =====================================================

class DeleteAccountSerializer(serializers.Serializer):

    password = serializers.CharField(
        write_only=True
    )

    def validate_password(self, value):

        user = self.context["request"].user

        if not user.check_password(value):
            raise serializers.ValidationError(
                "Incorrect password."
            )

        return value