package com.mycompany.maingtpkg.cucumber;

import com.mycompany.maingtpkg.MainMicroApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = MainMicroApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
