package com.islow.polling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PollingApplication {

    static Logger logger = LoggerFactory.getLogger(PollingApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(PollingApplication.class, args);

        logger.info("Application has started");
    }

}
