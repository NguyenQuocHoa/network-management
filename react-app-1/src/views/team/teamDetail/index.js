import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Switch, Typography, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import SelectStaff from "../../../components/selectStaff";
import { getTeamById, updateTeamById, insertTeam } from "../../../utils/services/team";
import "../styles.css";

const { TextArea } = Input;
const { Title } = Typography;

const TeamDetail = ({ isEdit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [teamPayload, setTeamPayload] = useState({});

    const onValuesChange = (fieldData) => {
        setTeamPayload({ ...teamPayload, ...fieldData });
    };

    const onFinish = () => {
        if (teamPayload.id) {
            updateTeamById(teamPayload.id, teamPayload)
                .then(() => {
                    getTeam(teamPayload.id);
                })
                .catch((err) => {
                    console.error("err", err);
                });
        } else {
            insertTeam(teamPayload)
                .then(({ data }) => {
                    toDetailPage(data.teamId);
                    getTeam(data.teamId);
                })
                .catch((err) => {
                    console.error("err", err);
                });
        }
    };

    const getTeam = (teamId) => {
        setIsLoading(true);
        getTeamById(teamId)
            .then(({ data }) => {
                setTeamPayload(data);
                form.setFieldsValue({ ...data });
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            });
    };

    const toDetailPage = (teamId) => {
        navigate(`/teams/${teamId}`, {
            state: { teamId },
        });
    };

    useEffect(() => {
        let teamId = location?.state?.teamId;
        if (!teamId) {
            setTeamPayload({ isActive: 1 });
            return;
        }
        if (teamId) {
            getTeam(teamId);
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
                    className="form-team-detail"
                >
                    <Row justify="center">
                        {isEdit ? (
                            <Title type="warning" level={2}>
                                UPDATE TEAM
                            </Title>
                        ) : (
                            <Title type="success" level={2}>
                                INSERT TEAM
                            </Title>
                        )}
                    </Row>
                    <Form.Item name="teamName" label="Team name" required disabled={isEdit}>
                        <Input placeholder="Please input name of team" />
                    </Form.Item>
                    <Form.Item name="leaderId" label="Leader">
                        <SelectStaff
                            leaderId={teamPayload.leaderId}
                            handleSelected={onValuesChange}
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} maxLength={255} placeholder="Please input description" />
                    </Form.Item>
                    <Form.Item name="isActive" className="input-checkbox">
                        <Row justify="end">
                            <Switch
                                checkedChildren="active"
                                unCheckedChildren="inactive"
                                checked={teamPayload.isActive}
                                onChange={(checked) =>
                                    setTeamPayload({
                                        ...teamPayload,
                                        isActive: checked ? 1 : 0,
                                    })
                                }
                            ></Switch>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Button htmlType="submit" type="primary">
                                SAVE TEAM
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </Navbar>
    );
};
export default TeamDetail;
