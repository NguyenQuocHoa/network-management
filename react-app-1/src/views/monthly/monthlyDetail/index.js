import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Form, Input, Row, Typography, DatePicker, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import { getMonthlyById, updateMonthlyById, insertMonthly } from "../../../utils/services/monthly";
import "../styles.css";

const { TextArea } = Input;
const { Title } = Typography;

const MonthlyDetail = ({ isEdit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [monthlyPayload, setMonthlyPayload] = useState({});

    const onValuesChange = (fieldData) => {
        setMonthlyPayload({ ...monthlyPayload, ...fieldData });
    };

    const onFinish = () => {
        if (monthlyPayload.id) {
            updateMonthlyById(monthlyPayload.id, {
                ...monthlyPayload,
                workMonth: moment(monthlyPayload.workMonth).format("YYYY-MM-DD"),
            })
                .then(() => {
                    getMonthly(monthlyPayload.id);
                })
                .catch((err) => {
                    console.error("err", err);
                });
        } else {
            insertMonthly({
                ...monthlyPayload,
                workMonth: moment(monthlyPayload.workMonth).format("YYYY-MM-DD"),
            })
                .then(({ data }) => {
                    toDetailPage(data.monthlyId);
                    getMonthly(data.monthlyId);
                })
                .catch((err) => {
                    console.error("err", err);
                });
        }
    };

    const getMonthly = (monthlyId) => {
        setIsLoading(true);
        getMonthlyById(monthlyId)
            .then(({ data }) => {
                setMonthlyPayload(data);
                form.setFieldsValue({ ...data, workMonth: moment(data.workMonth) });
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            });
    };

    const toDetailPage = (monthlyId) => {
        navigate(`/monthlies/${monthlyId}`, {
            state: { monthlyId },
        });
    };

    useEffect(() => {
        let monthlyId = location?.state?.monthlyId;
        if (monthlyId) {
            getMonthly(monthlyId);
        }
    }, []);

    return (
        <Navbar bgColor="main-content-gray">
            <Spin spinning={isLoading} size="large">
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    className="form-monthly-detail"
                >
                    <Row justify="center">
                        {isEdit ? (
                            <Title type="warning" level={2}>
                                UPDATE MONTHLY
                            </Title>
                        ) : (
                            <Title type="success" level={2}>
                                INSERT MONTHLY
                            </Title>
                        )}
                    </Row>
                    <Form.Item name="workMonth" label="Work month" className="input-work-month">
                        <DatePicker placeholder="Please input Work month" disabled={isEdit} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} maxLength={255} placeholder="Please input description" />
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Button htmlType="submit" type="primary">
                                SAVE MONTHLY
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </Navbar>
    );
};
export default MonthlyDetail;
