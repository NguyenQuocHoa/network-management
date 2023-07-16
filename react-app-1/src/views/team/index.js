import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import TeamItem from "../../components/teamItem";
import { getTeams, updateTeamStatus, deleteTeamById } from "../../../src/utils/services/team";
import { checkJwtToken, checkUnauthorized } from "../../utils/util";
import { URL_LOGIN } from "../../../src/utils/constant";
import "./styles.css";

const Team = () => {
    const navigate = useNavigate();
    const [idsChange, setIdsChange] = useState([]);
    const [lstTeam, setLstTeam] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!checkJwtToken()) {
            navigate(URL_LOGIN);
            return;
        }
        getTeamListAction();
    }, []);

    const getTeamListAction = () => {
        setIsLoading(true);
        getTeams()
            .then(({ data }) => {
                if (data.length > 0) {
                    setLstTeam([...data]);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => {
                checkErr(err);
            });
    };

    const updateTeamStatusAction = () => {
        if (idsChange?.length === 0) {
            return;
        }
        setIsLoading(true);
        updateTeamStatus(idsChange).then(() => getTeamListAction());
    };

    const toInsertTeamPage = () => {
        navigate("/teams/insert");
    };

    const checkErr = (err) => {
        if (!checkUnauthorized(err)) {
            navigate(URL_LOGIN);
            return;
        }
    };

    const deleteTeam = (teamId) => {
        deleteTeamById(teamId).then(() => {
            getTeamListAction();
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
                                onClick={updateTeamStatusAction}
                            >
                                SAVE TEAM
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertTeamPage}
                            >
                                INSERT TEAM
                            </Button>
                        </Col>
                    </Row>
                    {lstTeam.map((team) => (
                        <TeamItem
                            key={team.id}
                            teamId={team.id}
                            teamName={team.teamName}
                            description={team.description}
                            isActive={team.isActive}
                            idsChange={idsChange}
                            setIdsChange={setIdsChange}
                            deleteTeam={deleteTeam}
                        />
                    ))}
                    <Row className="row-action-bottom" justify="space-between">
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateTeamStatusAction}
                            >
                                SAVE TEAM
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertTeamPage}
                            >
                                INSERT TEAM
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Team;
