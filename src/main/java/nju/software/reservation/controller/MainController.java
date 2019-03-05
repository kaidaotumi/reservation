package nju.software.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class MainController {

    @RequestMapping(value="/", method=RequestMethod.GET)
    public String getLoginPage() {
        return "templates/login.html";
    }

    @RequestMapping(value="/login",method=RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        response.setCharacterEncoding("UTF-8");

        if (username.equals("Admin") && password.equals("Admin1234")) {
            response.getWriter().print("success");
        } else {
            response.getWriter().print("用户名或密码错误");
        }
    }

	@RequestMapping(value="/expertList", method=RequestMethod.GET)
    public String getExpertListPage() {
        return "templates/expertList.html";
    }

//    @RequestMapping("/detail/{id}")
//    public String getDetailPage(@PathVariable("id") String itemId, Model model) {
//	    model.addAttribute("itemId", itemId);
//	    System.out.println(itemId);
//        return "detail";
//    }

//    @RequestMapping("/{id}")
//    public ModelAndView getDetailPage(@PathVariable("id") String itemId, Model model) {
//        System.out.println(itemId);
//        ModelAndView modelAndView = new ModelAndView("detail");
//        modelAndView.addObject("id",itemId);
//        return modelAndView;
//    }

    @RequestMapping(value="/teacherList", method=RequestMethod.GET)
    public String getTeacherListPage() {
        return "templates/teacherList.html";
    }

    @RequestMapping(value="/serviceList", method=RequestMethod.GET)
    public String getServiceListPage() {
        return "templates/serviceList.html";
    }

    @RequestMapping(value="/orderList", method=RequestMethod.GET)
    public String getOrderListPage() {
        return "templates/orderList.html";
    }

    @RequestMapping(value="/studentList", method=RequestMethod.GET)
    public String getStudentListPage() {
        return "templates/studentList.html";
    }

    @RequestMapping(value="/institudeList", method=RequestMethod.GET)
    public String getInstitudeListPage() {
    return "templates/institudeRankList.html";
}

    @RequestMapping(value="/majorList", method=RequestMethod.GET)
    public String getMajorListPage() {
        return "templates/majorRankList.html";
    }

}
