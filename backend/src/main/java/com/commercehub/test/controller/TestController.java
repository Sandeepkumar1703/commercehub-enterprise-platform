package com.commercehub.backend.test.controller;


import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/test")
public class TestController {


    @GetMapping("/public")
    public String publicEndpoint(){

        return "Public endpoint working";
    }



    @GetMapping("/private")
    public String privateEndpoint(){

        return "JWT authentication working";
    }

}