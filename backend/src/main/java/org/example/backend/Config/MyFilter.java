package org.example.backend.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class MyFilter extends OncePerRequestFilter {
    public static String secretKey = "10sn19hd94nbf83b82bd1m0dm10ewbf3b1ms1asd";

    private UserDetailsService userDetailsService;


    public MyFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("token");
        String requestPath = request.getRequestURI();
        if (requestPath.startsWith("/api")) {
            if (isOpenUrl(requestPath)) {
                try {
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                    response.getWriter().write("Invalid token");
                    response.getWriter().flush();
                    return;
                }
                return;
            }
            if (token != null && token != "") {
                Claims body = null;
                try {
                    body = Jwts.parserBuilder()
                            .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                            .build()
                            .parseClaimsJws(token)
                            .getBody();
                } catch (ExpiredJwtException e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
                String username = body.get("iss").toString();
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
    private static boolean isOpenUrl(String requestPath) {
        return requestPath.equals("/api/auth/login")
                || requestPath.startsWith("/api/file/getFile")
                || requestPath.equals("/api/auth/access")
                || requestPath.equals("/api/auth/refresh")
                || requestPath.equals("/api/bot");
    }
}
