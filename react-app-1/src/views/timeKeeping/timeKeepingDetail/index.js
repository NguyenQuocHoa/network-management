import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Switch, Typography, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import { getTimeKeepingById, updateTimeKeepingById } from "../../../utils/services/timeKeeping";
import "../styles.css";

const { TextArea } = Input;
const { Title } = Typography;

const TimeKeepingDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [timeKeepingPayload, setTimeKeepingPayload] = useState({});

    const onValuesChange = (fieldData) => {
        setTimeKeepingPayload({ ...timeKeepingPayload, ...fieldData });
    };

    const onFinish = () => {
        if (timeKeepingPayload.id) {
            updateTimeKeepingById(timeKeepingPayload.id, timeKeepingPayload)
                .then(() => {
                    getTimeKeeping(timeKeepingPayload.id);
                })
                .catch((err) => {
                    console.error("err", err);
                });
        }
    };

    const getTimeKeeping = (timeKeepingId) => {
        setIsLoading(true);
        getTimeKeepingById(timeKeepingId)
            .then(({ data }) => {
                setTimeKeepingPayload(data);
                form.setFieldsValue({ ...data });
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            });
    };

    const toDetailPage = (timeKeepingId) => {
        navigate(`/timeKeepings/${timeKeepingId}`, {
            state: { timeKeepingId },
        });
    };

    useEffect(() => {
        let timeKeepingId = location?.state?.timeKeepingId;
        if (!timeKeepingId) {
            setTimeKeepingPayload({ isCheck: 1 });
            return;
        }
        if (timeKeepingId) {
            getTimeKeeping(timeKeepingId);
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
                    className="form-time-keeping-detail"
                >
                    <Row justify="center">
                        <Title type="success" level={2}>
                            UPDATE TIME KEEPING
                        </Title>
                    </Row>
                    <Form.Item name="staffName" label="Staff name">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} maxLength={255} placeholder="Please input description" />
                    </Form.Item>
                    <Form.Item name="isCheck" className="input-checkbox">
                        <Row justify="end">
                            <Switch
                                checkedChildren="check"
                                unCheckedChildren="uncheck"
                                checked={timeKeepingPayload.isCheck}
                                onChange={(checked) =>
                                    setTimeKeepingPayload({
                                        ...timeKeepingPayload,
                                        isCheck: checked ? 1 : 0,
                                    })
                                }
                            ></Switch>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Button htmlType="submit" type="primary">
                                SAVE TIME KEEPING
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </Navbar>
    );
};
export default TimeKeepingDetail;
