package com.nhom34.configs;

import com.nhom34.filters.JwtFilter;
import jakarta.servlet.Filter;
import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.ServletRegistration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class DispatcherServeletInit
        extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{
            ThymeleafConfigs.class,
            HibernateConfigs.class,
            SpringSecurityConfigs.class
        };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{
            WebAppContextConfigs.class
        };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {

        MultipartConfigElement multipartConfig =
                new MultipartConfigElement(
                        null,
                        5 * 1024 * 1024,
                        15 * 1024 * 1024,
                        0
                );

        registration.setMultipartConfig(multipartConfig);
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{new JwtFilter()};
    }
}