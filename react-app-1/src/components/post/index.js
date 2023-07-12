import React, { useState } from "react";
import { Space, Row, Col, Skeleton, Button } from "antd";
import {
    HeartOutlined,
    HeartFilled,
    CommentOutlined,
    ShareAltOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import "./styles.css";

const Post = ({
    id,
    userId,
    userName,
    userAvatar,
    minutesAgo,
    caption,
    imageUrl,
    isHeart,
    isComment,
    isShare,
    numberHeart,
    numberComment,
}) => {
    const [active, setActive] = useState(false);
    const [size, setSize] = useState("large");
    const [avatarShape, setAvatarShape] = useState("circle");

    return (
        <Space className="post-space-container">
            <Row gutter={[16, 6]}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Row gutter={16}>
                                <Col>
                                    <Skeleton.Avatar
                                        active={active}
                                        size={size}
                                        shape={avatarShape}
                                    />
                                </Col>
                                <Col>
                                    <div className="user-name">{userName}</div>
                                    <div className="minutes-ago">{minutesAgo}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Button
                                shape="circle"
                                icon={<MoreOutlined className="icon-more-custom" />}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24}>
                    <p className="text-caption">{caption}</p>
                </Col>
                <Col xs={24}>
                    <Row gutter={10}>
                        <Col xs={12} className="skeleton-big">
                            <Skeleton.Avatar active={active} size={size} shape={"square"} />
                        </Col>
                        <Col xs={12} className="skeleton-small">
                            <Row gutter={[10, 10]}>
                                <Col>
                                    <Skeleton.Avatar active={active} size={size} shape={"square"} />
                                </Col>
                                <Col>
                                    <Skeleton.Avatar active={active} size={size} shape={"square"} />
                                </Col>
                                <Col>
                                    <Skeleton.Avatar active={active} size={size} shape={"square"} />
                                </Col>
                                <Col>
                                    <Skeleton.Avatar active={active} size={size} shape={"square"} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24}>
                    <Row justify="space-between" align="middle" className="control-bottom">
                        <Col xs={12}>
                            <Row>
                                <Col xs={12}>
                                    <Button
                                        shape="circle"
                                        icon={
                                            isHeart ? (
                                                <HeartFilled className="icon-custom heart-active" />
                                            ) : (
                                                <HeartOutlined className="icon-custom" />
                                            )
                                        }
                                    />
                                    {numberHeart}
                                </Col>
                                <Col>
                                    <Button
                                        shape="circle"
                                        icon={
                                            <CommentOutlined
                                                className={`icon-custom ${
                                                    isComment ? "active-comment" : ""
                                                }`}
                                            />
                                        }
                                    />
                                    {numberComment}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            Share
                            <Button
                                shape="circle"
                                icon={
                                    <ShareAltOutlined
                                        className={`icon-custom ${isShare ? "active-share" : ""}`}
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default Post;
