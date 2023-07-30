import React, { useEffect, useState } from "react";
import "./Booking.scss";
import { useParams } from "react-router-dom";
import { rapServ } from "../../services/rapServices";
import { Card, Row, Col, Button } from "antd";

function Booking() {
  const [checkout, setCheckout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const { bookingId } = useParams();
  const isSeatSelected = (seat) => selectedSeats.includes(seat.maGhe);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      isSeatSelected(seat)
        ? prevSelectedSeats.filter((id) => id !== seat.maGhe)
        : [...prevSelectedSeats, seat.maGhe]
    );
    // console.log(selectedSeats);
  };

  const handleBookTicket = async () => {
    const selectedSeatsDetails = selectedSeats.map((selectedSeatId) => {
      return (
        checkout?.danhSachGhe?.find((seat) => seat.maGhe === selectedSeatId) ||
        null
      );
    });

    // Handle the logic for booking the selected seats
    // console.log("Booking selected seats:", selectedSeatsDetails);

    const data = {
      danhsachve: selectedSeatsDetails,
      maLichChieu: bookingId,
    };

    await rapServ
      .addDatVe(data)
      .then((res) => {
        alert("Đặt thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    rapServ
      .getSeats(bookingId)
      .then((res) => {
        // console.log(res.data.content);
        setCheckout(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">

    <div className="bookingFont">
      <Row>
        <Col className="xsm:col-12 md:col-xxl-8 mx-auto">
          <div className="seat-div">
            <div className="seat-grid-title">Lựa chọn chỗ ngồi</div>
            <div className="seat-grid">
              {checkout?.danhSachGhe?.map((seat) => (
                <div
                  key={seat.maGhe}
                  className={`seat ${
                    seat.daDat
                      ? "occupied"
                      : seat.loaiGhe === "Vip"
                      ? "vip"
                      : ""
                  } ${isSeatSelected(seat) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.tenGhe}
                </div>
              ))}
            </div>
          </div>
          <div className="seat-legend">
            <div className="legend-item">
              <div className="seat occupied"></div>
              <span>Đã đặt</span>
            </div>
            <div className="legend-item">
              <div className="seat vip"></div>
              <span>Ghế VIP</span>
            </div>
            <div className="legend-item">
              <div className="seat"></div>
              <span>Ghế trống</span>
            </div>
            <div className="legend-item">
              <div className="seat selected"></div>
              <span>Ghế đã chọn</span>
            </div>
          </div>
        </Col>
        <Col className="xsm:col-12 md:col-xxl-4 mb-5 mx-auto">
          <Card
            className="movie-card"
            style={{ width: 400 }}
            cover={
              <img
                alt={checkout?.thongTinPhim?.tenPhim}
                src={checkout?.thongTinPhim?.hinhAnh}
              />
            }
          >
            <Row gutter={16}>
              <Col span={24}>
                <div className="movie-details">
                  <p>
                    <strong>Tên rạp:</strong>{" "}
                    {`${checkout?.thongTinPhim?.tenCumRap} - ${checkout?.thongTinPhim?.tenRap}`}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {checkout?.thongTinPhim?.diaChi}
                  </p>
                  <p>
                    <strong>Tên phim:</strong> {checkout?.thongTinPhim?.tenPhim}
                  </p>
                  <p>
                    <strong>Ngày chiếu:</strong>{" "}
                    {checkout?.thongTinPhim?.ngayChieu}
                  </p>
                  <p>
                    <strong>Giờ chiếu:</strong>{" "}
                    {checkout?.thongTinPhim?.gioChieu}
                  </p>
                  <Col span={24} style={{ marginTop: 12 }}>
                    <Button
                      type="primary"
                      danger
                      block
                      onClick={handleBookTicket}
                    >
                      Đặt vé
                    </Button>
                  </Col>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
}

export default Booking;
