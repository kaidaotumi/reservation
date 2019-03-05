package nju.software.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/teacher")
public class TeacherController {

    @RequestMapping(value="/teacherDetail", method=RequestMethod.GET)
    public String getDetailPage(@RequestParam("wechatId") String wechatId, HttpSession session) {
        session.setAttribute("wechatId", wechatId);
        System.out.println(wechatId);
        return "../templates/teacherDetail.html";
    }

    @RequestMapping(value="/getTeacherId", method=RequestMethod.GET)
    @ResponseBody
    public String getTeacherid(HttpSession session) {
        String wechatId = (String) session.getAttribute("wechatId");
        return wechatId;
    }
}
