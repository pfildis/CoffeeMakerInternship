package com.coffe.maker;

import com.coffe.maker.components.*;
import com.coffe.maker.controller.*;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;


@RunWith(MockitoJUnitRunner.class)

public class DenemeTest {

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
    public void init()
    {
        mockMvc = standaloneSetup(coffeeController).build();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void firstTest(){
        Assert.assertTrue(true);
        System.out.println(waterSensor.hasWater());
    }
}
