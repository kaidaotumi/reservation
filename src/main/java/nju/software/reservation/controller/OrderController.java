package nju.software.reservation.controller;

import nju.software.reservation.vo.OrderVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/order")
public class OrderController {

    @RequestMapping(value="/addOrder", method= RequestMethod.GET)
    public String getAddPage() {
        return "../templates/addOrder.html";
    }

    @RequestMapping(value = "/orderDetail", method = RequestMethod.GET)
    public String getDetailPage(HttpSession session) {
//        session.setAttribute("ordervo", vo);
//        System.out.println(vo);
        return "../templates/orderDetail.html";
    }

    @RequestMapping(value = "/postOrder", method = RequestMethod.POST)
    @ResponseBody
    public String postOrder(@RequestBody OrderVO vo, HttpSession session) {
        session.setAttribute("ordervo", vo);
        System.out.println(vo);
        return "suc";
    }

    @RequestMapping(value="/getOrder", method=RequestMethod.GET)
    @ResponseBody
    public OrderVO getOrder(HttpSession session) {
        OrderVO vo = (OrderVO) session.getAttribute("ordervo");
        return vo;
    }
}
