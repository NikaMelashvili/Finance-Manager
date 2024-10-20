package com.melashvili.bank_backend.controller;

import com.melashvili.bank_backend.model.dto.request.FinanceRequest;
import com.melashvili.bank_backend.services.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/finance")
public class FinanceController {

    private FinanceService financeService;

    @Autowired
    public void setFinanceService(FinanceService financeService) {
        this.financeService = financeService;
    }

    public ResponseEntity<Void> addFinancialInfo(@RequestBody FinanceRequest financeRequest,
                                                 @RequestParam("accountEmail") String email) {
        financeService.addRecord(financeRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
