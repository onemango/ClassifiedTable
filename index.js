/**
 * Copyright 2014-2019, FengMap, Ltd.
 * All rights reserved.
 * -
 * @authors  XT (xiting@fengmap.com)
 * @date     2018/06/11
 * @describe antDesign的Table组件分类选择
 */
'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'antd';
import _ from 'lodash';

const message = [
  { type: 1, name: '读写信息', color: '#5bb570' },
  { type: 2, name: '故障信息', color: 'red' },
  { type: 3, name: '车位信息', color: '#0366d6' },
];

export default class ClassifiedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectType: 0,              //选择的type，1读写信息，2故障信息，3车位信息
      selectedRowKeys: [],        //选中的id集合
      disabled: [],               //设置不可选中的点
    };
    this.data = null;
  }

  componentDidMount() {
    let selectedRowKeys = [];
    const { datas } = this.props;
    datas.map(item => {
      if (item.type !== 0) {
        selectedRowKeys.push(item.id);
      }
    });
    this.data = datas;
    this.setState({ data: this.data, selectedRowKeys, disabled: this.data });
  }

  /**
   * 点击去选择
   * @param type 1选择读写信息，2选择故障信息，3选择车位信息
   */
  onChoose = (type) => {
    const { data } = this.state;
    let disabled = data.filter(item => item.type !== 0 && item.type !== type);
    this.setState({ selectType: type, disabled });
  };

  /**
   * 去选择的取消
   */
  onCancel = () => {
    const { data } = this.state;
    let selectedRowKeys = [];
    data.map(item => {
      if (item.type !== 0) {
        selectedRowKeys.push(item.id);
      }
    });
    this.data = data;
    this.setState({ selectedRowKeys, disabled: data, selectType: 0 });
  };

  /**
   * 去选择的保存
   */
  onSave = () => {
    let selectedRowKeys = [];
    this.data.map(item => {
      if (item.type !== 0) {
        selectedRowKeys.push(item.id);
      }
    });
    this.setState({ data: this.data, selectedRowKeys, disabled: this.data, selectType: 0 });
  };

  /**
   * 选择table条目
   * @param selectedRowKeys 选中的key集合
   * @param selectedRows 选中的row集合
   */
  onChange = (selectedRowKeys, selectedRows) => {
    const { selectType, data } = this.state;
    let dataClone = _.cloneDeep(data);
    this.data = dataClone.map(item => {
      if (JSON.stringify(selectedRows).indexOf(JSON.stringify(item)) !== -1) {
        item.type = item.type === 0 ? selectType : item.type;
      } else {
        item.type = 0;
      }
      return item;
    });
    this.setState({ selectedRowKeys });
  };


  /**
   * 计算每个type的length
   * @param type  1选择读写信息，2选择故障信息，3选择车位信息
   */
  getLength = (type) => {
    const { data } = this.state;
    return data.filter(item => item.type === type).length;
  };

  render() {
    const { data, selectType, selectedRowKeys, disabled } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChange,
      getCheckboxProps: record => ({ disabled: disabled.indexOf(record) !== -1 }),
    };

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'key',
        width: '10%',
      },
      {
        title: '车位号',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '信息类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          switch (text) {
            case 1:
              return <span style={{ color: '#5bb570' }}>读写信息</span>;
            case 2:
              return <span style={{ color: 'red' }}>故障信息</span>;
            case 3:
              return <span style={{ color: '#0366d6' }}>车位信息</span>;
            default:
              return '----';
          }
        },
      },
    ];


    return (<React.Fragment>
      <Row style={{ margin: 20 }}>
        {
          message && message.map((item, index) => {
            return (<Col span={8} key={index}>
              <span style={{ color: item.color, margin: 20 }}>{item.name}：{this.getLength(item.type)}</span>
              {
                selectType !== item.type ? <Button onClick={() => this.onChoose(item.type)}>去选择</Button> :
                  (
                    <span>
                  <Button onClick={this.onCancel}>取消</Button>
                  <Button onClick={this.onSave} type='primary'>保存</Button>
                </span>
                  )
              }
            </Col>);
          })
        }
      </Row>
      <Table style={{ margin: 20 }} columns={columns} dataSource={data} pagination={false} scroll={{ y: 300 }} rowSelection={rowSelection} rowKey={'id'}/>
    </React.Fragment>);
  }
}

ClassifiedTable.defaultProps = {
  datas: [
    { id: 0, name: '100', type: 0 }, //0表示无状态 1读写2故障3车位
    { id: 1, name: '101', type: 1 },
    { id: 2, name: '102', type: 2 },
    { id: 3, name: '103', type: 0 },
    { id: 4, name: '104', type: 3 },
    { id: 5, name: '105', type: 1 },
    { id: 6, name: '106', type: 1 },
    { id: 7, name: '107', type: 1 },
    { id: 8, name: '108', type: 1 },
    { id: 9, name: '109', type: 1 },
  ],
};
