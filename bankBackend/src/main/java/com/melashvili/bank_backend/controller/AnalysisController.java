package com.melashvili.bank_backend.controller;

import com.melashvili.bank_backend.model.dto.response.AnalysisResponse;
import com.melashvili.bank_backend.services.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/analysis")
public class AnalysisController {

    private AnalysisService analysisService;

    @Autowired
    public void setAnalysisService(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @RequestMapping("/get")
    public AnalysisResponse getAnalysisResponse(@RequestParam("accountEmail") String email) {
        return analysisService.dataAnalysis(email);
    }
}
