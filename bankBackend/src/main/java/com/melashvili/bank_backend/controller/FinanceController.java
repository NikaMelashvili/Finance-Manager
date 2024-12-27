package com.melashvili.bank_backend.controller;

import com.melashvili.bank_backend.model.dto.response.FinanceDataResponse;
import com.melashvili.bank_backend.services.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/finance")
public class FinanceController {

    private FinanceService financeService;

    @Autowired
    public void setFinanceService(FinanceService financeService) {
        this.financeService = financeService;
    }

    @RequestMapping("/get")
    public List<FinanceDataResponse> getFinanceData(@RequestParam("accountEmail") String email){
        return financeService.getFinanceData(email);
    }
}
