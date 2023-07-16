import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import StaffItem from "../../components/staffItem";
import { getStaffs, updateStaffStatus, deleteStaffById } from "../../../src/utils/services/staff";
import "./styles.css";

const Staff = () => {
    const navigate = useNavigate();
    const [idsChange, setIdsChange] = useState([]);
    const [lstStaff, setLstStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getStaffListAction();
    }, []);

    const getStaffListAction = () => {
        setIsLoading(true);
        getStaffs()
            .then(({ data }) => {
                if (data.length > 0) {
                    setLstStaff([...data]);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => console.error(err));
    };

    const updateStaffStatusAction = () => {
        if (idsChange?.length === 0) {
            return;
        }
        setIsLoading(true);
        updateStaffStatus(idsChange).then(() => getStaffListAction());
    };

    const toInsertStaffPage = () => {
        navigate("/staffs/insert");
    };

    const deleteStaff = (staffId) => {
        deleteStaffById(staffId).then(() => {
            getStaffListAction();
        });
    };

    return (
        <>
            <Navbar bgColor="main-content-gray">
                <Spin spinning={isLoading} size="large">
                    <Row className="row-action-top" justify="space-between">
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateStaffStatusAction}
                            >
                                SAVE STAFF
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertStaffPage}
                            >
                                INSERT STAFF
                            </Button>
                        </Col>
                    </Row>
                    {lstStaff.map((staff) => (
                        <StaffItem
                            key={staff.id}
                            staffId={staff.id}
                            staffName={staff.staffName}
                            phone={staff.phone}
                            description={staff.description}
                            isActive={staff.isActive}
                            idsChange={idsChange}
                            setIdsChange={setIdsChange}
                            deleteStaff={deleteStaff}
                        />
                    ))}
                    <Row className="row-action-bottom" justify="space-between">
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateStaffStatusAction}
                            >
                                SAVE STAFF
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertStaffPage}
                            >
                                INSERT STAFF
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Staff;
