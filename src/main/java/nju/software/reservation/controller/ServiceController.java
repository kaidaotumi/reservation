package nju.software.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/service")
public class ServiceController {

    @RequestMapping(value="/addService", method= RequestMethod.GET)
    public String getAddPage() {
        return "../templates/addService.html";
    }

    @RequestMapping(value="/serviceDetail", method=RequestMethod.GET)
    public String getDetailPage(@RequestParam("id") String id, HttpSession session) {
        session.setAttribute("serviceid", id);
        System.out.println(id);
        return "../templates/serviceDetail.html";
    }

    @RequestMapping(value="/getServiceId", method=RequestMethod.GET)
    @ResponseBody
    public String getServiceid(HttpSession session) {
        String id = (String) session.getAttribute("serviceid");
        return id;
    }
}
