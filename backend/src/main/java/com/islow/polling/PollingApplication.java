package com.islow.polling;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class PollingApplication {


    private static final Logger logger = LoggerFactory.getLogger(PollingApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(PollingApplication.class, args);
        logger.info("Application is started.");
    }

}
