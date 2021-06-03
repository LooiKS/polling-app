package com.islow.polling.provider;

import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;

@Component
public class JwtTokenProvider {

	private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
	private String SECRET_KEY = "akjf0vemasldsjcve139rcpa";

	public String createToken(String username) {

		Date now = new Date();
		JwtBuilder builder = Jwts.builder().setId(username).setIssuedAt(now).setSubject("token")
				.setIssuer(username).setExpiration(new Date(now.getTime() + 24 * 60 * 60 * 1000)).signWith(signatureAlgorithm, TextCodec.BASE64.decode(SECRET_KEY));

		return builder.compact();
	}

	public Claims parseToken(String token) {
		try {
			return Jwts.parser().setSigningKey(TextCodec.BASE64.decode(SECRET_KEY)).parseClaimsJws(token).getBody();
		} catch (Exception ex) {
			return null;
		}
	}
}