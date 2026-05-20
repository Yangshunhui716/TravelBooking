package com.nhom34.filters;

import com.nhom34.utils.JwtUtils;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class JwtFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String uri = httpRequest.getRequestURI();

        System.out.println("FILTER URI = " + uri);

        // Chỉ check JWT với api secure
        if (uri.startsWith(httpRequest.getContextPath() + "/api/secure")) {

            String header = httpRequest.getHeader("Authorization");

            if (header == null || !header.startsWith("Bearer ")) {
                httpResponse.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Missing Authorization Header"
                );
                return;
            }

            try {
                String token = header.substring(7);

                String username =
                        JwtUtils.validateTokenAndGetUsername(token);

                if (username == null) {
                    httpResponse.sendError(
                            HttpServletResponse.SC_UNAUTHORIZED,
                            "Invalid token"
                    );
                    return;
                }

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                null
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

            } catch (Exception e) {

                e.printStackTrace();

                httpResponse.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Token invalid"
                );

                return;
            }
        }

        chain.doFilter(request, response);
    }
}