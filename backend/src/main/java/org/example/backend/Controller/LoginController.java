package org.example.backend.Controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.example.backend.Config.MyFilter;
import org.example.backend.Entity.Role;
import org.example.backend.Entity.User;
import org.example.backend.Payload.LoginRequest;
import org.example.backend.Repo.UsersRepo;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final UsersRepo usersRepo;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(MyFilter.secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }



    @GetMapping("/api/me")
    public ResponseEntity<Object> getMe(@RequestHeader(value = "token") String token) {
        Claims claims = extractAllClaims(token);
        String username = claims.getSubject();
        User checkingUser = usersRepo.findByUsername(username);
        if(checkingUser != null) {
            Role role = checkingUser.getRoles().get(0);
            return new ResponseEntity<>(role.getRoleName(), HttpStatus.OK);
        }
        return new ResponseEntity<>("invalid token", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/api/login")
    public HttpEntity<?> login(@RequestBody LoginRequest loginReq) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginReq.getUsername());
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    loginReq.getPassword(),
                    userDetails.getAuthorities()
            );

            authenticationManager.authenticate(authenticationToken);

            String token = Jwts
                    .builder()
                    .setIssuer(userDetails.getUsername())
                    .setSubject(loginReq.getUsername())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                    .signWith(Keys.hmacShaKeyFor(MyFilter.secretKey.getBytes()))
                    .compact();
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

    }
}