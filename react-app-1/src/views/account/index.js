import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import Navbar from "../../components/navbar";
import AccountItem from "../../components/accountItem";
import { getAccounts, updateAccountStatus } from "../../../src/utils/services/account";
import "./styles.css";

const Account = () => {
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
            .catch((err) => console.log(err));
    };

    const updateAccountStatusAction = () => {
        if (idsChange?.length === 0) {
            return;
        }
        setIsLoading(true);
        updateAccountStatus(idsChange).then(() => getAccountListAction());
    };

    return (
        <>
            <Navbar bgColor="main-content-gray">
                <Spin spinning={isLoading} size="large">
                    <Row className="row-action-top">
                        <Col xs={24}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateAccountStatusAction}
                            >
                                Lưu thông tin tài khoản
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
                        />
                    ))}
                    <Row className="row-action-bottom">
                        <Col xs={24}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateAccountStatusAction}
                            >
                                Lưu thông tin tài khoản
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Account;
