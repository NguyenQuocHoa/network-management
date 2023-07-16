import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Form, Input, Row, Switch, Typography, DatePicker, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import SelectTeam from "../../../components/selectTeam";
import { getStaffById, updateStaffById, insertStaff } from "../../../utils/services/staff";
import { checkJwtToken, checkUnauthorized } from "../../../utils/util";
import { URL_LOGIN } from "../../../../src/utils/constant";
import "../styles.css";

const { TextArea } = Input;
const { Title } = Typography;

const StaffDetail = ({ isEdit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [staffPayload, setStaffPayload] = useState({});

    const onValuesChange = (fieldData) => {
        setStaffPayload({ ...staffPayload, ...fieldData });
    };

    const onFinish = () => {
        let dob = moment(staffPayload.dob).format("YYYY-MM-DD");
        if (staffPayload.id) {
            updateStaffById(staffPayload.id, {
                ...staffPayload,
                dob,
            })
                .then(() => {
                    getStaff(staffPayload.id);
                })
                .catch((err) => {
                    checkErr(err);
                });
        } else {
            insertStaff({ ...staffPayload, dob })
                .then(({ data }) => {
                    toDetailPage(data.staffId);
                    getStaff(data.staffId);
                })
                .catch((err) => {
                    checkErr(err);
                });
        }
    };

    const getStaff = (staffId) => {
        setIsLoading(true);
        getStaffById(staffId)
            .then(({ data }) => {
                setStaffPayload(data);
                form.setFieldsValue({ ...data, dob: moment(data.dob) });
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => {
                checkErr(err);
            });
    };

    const toDetailPage = (staffId) => {
        navigate(`/staffs/${staffId}`, {
            state: { staffId },
        });
    };

    const checkErr = (err) => {
        if (!checkUnauthorized(err)) {
            navigate(URL_LOGIN);
            return;
        }
    };

    useEffect(() => {
        if (!checkJwtToken()) {
            navigate(URL_LOGIN);
            return;
        }
        let staffId = location?.state?.staffId;
        if (!staffId) {
            setStaffPayload({ isActive: 1 });
            return;
        }
        if (staffId) {
            getStaff(staffId);
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
                    className="form-staff-detail"
                >
                    <Row justify="center">
                        {isEdit ? (
                            <Title type="warning" level={2}>
                                UPDATE STAFF
                            </Title>
                        ) : (
                            <Title type="success" level={2}>
                                INSERT STAFF
                            </Title>
                        )}
                    </Row>
                    <Form.Item name="staffName" label="Staff name" required disabled={isEdit}>
                        <Input placeholder="Please input name of staff" />
                    </Form.Item>
                    <Form.Item name="dob" label="Date of Birth" className="input-dob">
                        <DatePicker placeholder="Please input Date of Birth" />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone">
                        <Input placeholder="Please input phone of staff" />
                    </Form.Item>
                    <Form.Item name="teamId" label="Team">
                        <SelectTeam teamId={staffPayload.teamId} handleSelected={onValuesChange} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} maxLength={255} placeholder="Please input description" />
                    </Form.Item>
                    <Form.Item name="isActive" className="input-checkbox">
                        <Row justify="end">
                            <Switch
                                checkedChildren="active"
                                unCheckedChildren="inactive"
                                checked={staffPayload.isActive}
                                onChange={(checked) =>
                                    setStaffPayload({
                                        ...staffPayload,
                                        isActive: checked ? 1 : 0,
                                    })
                                }
                            ></Switch>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Button htmlType="submit" type="primary">
                                SAVE STAFF
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </Navbar>
    );
};
export default StaffDetail;
