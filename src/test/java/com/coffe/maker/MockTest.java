package com.coffe.maker;

import com.coffe.maker.components.*;
import com.coffe.maker.controller.CoffeeController;
import com.coffe.maker.controller.Status;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.jsontype.impl.AsExistingPropertyTypeSerializer;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.runner.RunWith;

import org.mockito.mock.*;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;
/*
@RunWith(MockitoJUnitRunner.class)
public class MockTest {

    @Mock
    Boiler boiler;
    @Mock
    Light light;
    @Mock
    PlateSensor plateSensor;
    @Mock
    PotButton potButton;
    @Mock
    StartButton startButton;
    @Mock
    Valve valve;
    @Mock
    Warmer warmer;
    @Mock
    WaterButton waterButton;
    @Mock
    WaterSensor waterSensor;

    @InjectMocks
    CoffeeController coffeeController;

    MockMvc mockMvc;

    @Before
    public void init(){
        mockMvc = standaloneSetup(coffeeController).build();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void controllerTest() {
        System.out.println("Test 1");
        // Test for fillTank() and setWater() method.
        Assert.assertTrue("Status is NOT Correct", (coffeeController.status == Status.OFF));
        Assert.assertEquals("Water tank has been filled", coffeeController.fillTank());
    }

   @Test
   public void startTest(){
       System.out.println("Test 2");
       //Test for start() method.
       Assert.assertTrue("Status Not Correct (It should be OFF)", (coffeeController.status == Status.OFF));
       mockMvc.waterSensor.setWater(true);
       mockMvc.plateSensor.setPot(true);
       Mockito.doNothing().when(mockMvc).then(coffeeController.start());

       coffeeController.waterSensor.setWater(true);
       Mockito.doNothing().when(coffeeController.waterSensor).setWater(true);

       System.out.println(coffeeController.waterSensor.hasWater());
       Assert.assertTrue("HATA", (coffeeController.waterSensor.hasWater() == true));
       Mockito.doNothing().when(coffeeController.plateSensor).setPot(true);
       Assert.assertTrue("There is no water in the tank", (coffeeController.waterSensor.hasWater()));
       Assert.assertTrue("There is no pot on the plate", (coffeeController.plateSensor.hasPot()));
       Mockito.doNothing().when(boiler).on();
       Mockito.doNothing().when(valve).off();
       Mockito.doNothing().when(light).off();
       Mockito.doNothing().when(warmer).off();
       Assert.assertTrue("Status is NOT Correct", (coffeeController.status == Status.BREWING));
       Assert.assertEquals("Coffe maker is started", coffeeController.start());

   }
}*/
