import React from 'react';
import {Flex, Spin} from 'antd';

export const Loader: React.FC = () => (
    <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Flex gap="large" vertical>
            <Spin tip="Loading" size="large">
                <div className="content"/>
            </Spin>
        </Flex>
    </div>
);