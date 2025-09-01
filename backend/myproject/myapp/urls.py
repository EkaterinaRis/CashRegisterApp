from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CompanyView,StoreView,BillView,EmployeeView,EmployeeWorkTimeView,InCartView,PackageView,ProductView,RegisterView,RefundBillView


router=DefaultRouter()
router.register(r'company',CompanyView)
router.register(r'store',StoreView)
router.register(r'register',RegisterView)
router.register(r'employee',EmployeeView)
router.register(r'workTime',EmployeeWorkTimeView)
router.register(r'product',ProductView)
router.register(r'inCart',InCartView)
router.register(r'bill',BillView)
router.register(r'package',PackageView)
router.register(r'refund',RefundBillView)

urlpatterns = [
    path("api/", include(router.urls)),
]