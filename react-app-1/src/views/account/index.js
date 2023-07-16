import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import AccountItem from "../../components/accountItem";
import {
    getAccounts,
    updateAccountStatus,
    deleteAccountById,
} from "../../../src/utils/services/account";
import "./styles.css";

const Account = () => {
    const navigate = useNavigate();
    const [idsChange, setIdsChange] = useState([]);
    const [lstAccount, setLstAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAccountListAction();
    }, []);

    const getAccountListAction = () => {
        setIsLoading(true);
        getAccounts()
            .then(({ data }) => {
                if (data.length > 0) {
                    setLstAccount([...data]);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => console.error(err));
    };

    const updateAccountStatusAction = () => {
        if (idsChange?.length === 0) {
            return;
        }
        setIsLoading(true);
        updateAccountStatus(idsChange).then(() => getAccountListAction());
    };

    const toInsertAccountPage = () => {
        navigate("/accounts/insert");
    };

    const deleteAccount = (accountId) => {
        deleteAccountById(accountId).then(() => {
            getAccountListAction();
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
                                onClick={updateAccountStatusAction}
                            >
                                SAVE ACC
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertAccountPage}
                            >
                                INSERT ACC
                            </Button>
                        </Col>
                    </Row>
                    {lstAccount.map((account) => (
                        <AccountItem
                            key={account.id}
                            accountId={account.id}
                            username={account.username}
                            description={account.description}
                            isActive={account.isActive}
                            idsChange={idsChange}
                            setIdsChange={setIdsChange}
                            deleteAccount={deleteAccount}
                        />
                    ))}
                    <Row className="row-action-bottom" justify="space-between">
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateAccountStatusAction}
                            >
                                SAVE ACC
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertAccountPage}
                            >
                                INSERT ACC
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Account;
