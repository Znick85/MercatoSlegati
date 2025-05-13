from django.urls import path, include
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import GiocatoreViewSet, squadreViewSet, MyTokenObtainPairView, UserViewSet

router = DefaultRouter()
router.register(r'giocatori', GiocatoreViewSet)
router.register(r'squadre', squadreViewSet)


urlpatterns = [
    path('', include(router.urls)),
    # path('api/mie-squadre/', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]