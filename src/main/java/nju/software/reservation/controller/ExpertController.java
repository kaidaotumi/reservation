package nju.software.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/expert")
public class ExpertController {

    @RequestMapping(value="/addExpert", method= RequestMethod.GET)
    public String getAddPage() {
        return "../templates/addExpert.html";
    }

    @RequestMapping(value="/modifyExpert", method=RequestMethod.GET)
    public String getModifyPage(@RequestParam("id") String id, HttpSession session) {
        session.setAttribute("expertid", id);
        System.out.println(id);
        return "../templates/modifyExpert.html";
    }

    @RequestMapping(value="/getExpertId", method=RequestMethod.GET)
    @ResponseBody
    public String getExpertid(HttpSession session) {
        String id = (String) session.getAttribute("expertid");
        return id;
    }
}
