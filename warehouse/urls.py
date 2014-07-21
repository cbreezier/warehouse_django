from django.conf.urls import patterns, include, url
from warehouse import views

urlpatterns = patterns('',
    url(r'^(?P<warehouse_name>.+?)/$', views.warehouse, name='warehouse'),
)
