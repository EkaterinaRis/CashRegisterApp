"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from myapp.views import CompanyView,StoreView,BillView,EmployeeView,EmployeeWorkTimeView,InCartView,PackageView,ProductView,RegisterView

urlpatterns = [
    path("cash_register/",include("myapp.urls")),
    path('admin/', admin.site.urls),
]

# urlpatterns = [
#     #path('admin/', admin.site.urls),
#     path('company/', CompanyView.as_view(), name='company'),
#     path('store/', StoreView.as_view(), name='store'),
#     path('bill/', BillView.as_view(), name='bill'),
#     path('employee/', EmployeeView.as_view(), name='employee'),
#     path('employeeWorkTime/', EmployeeWorkTimeView.as_view(), name='employeeWorkTime'),
#     path('inCart/', InCartView.as_view(), name='inCart'),
#     path('product/', ProductView.as_view(), name='product'),
#     path('package/', PackageView.as_view(), name='package'),
#     path('register/', RegisterView.as_view(), name='register')
# ]
