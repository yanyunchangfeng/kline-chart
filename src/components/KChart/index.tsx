import React from 'react';
import { init, dispose, registerIndicator } from 'klinecharts';
export const KChart: React.FC = () => {
  React.useEffect(() => {
    function genData(timestamp = new Date().getTime(), length = 800) {
      let basePrice = 5000;
      timestamp = Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000;
      const dataList = [];
      for (let i = 0; i < length; i++) {
        const prices = [];
        for (let j = 0; j < 4; j++) {
          prices.push(basePrice + Math.random() * 60 - 30);
        }
        prices.sort();
        const open = +prices[Math.round(Math.random() * 3)].toFixed(2);
        const high = +prices[3].toFixed(2);
        const low = +prices[0].toFixed(2);
        const close = +prices[Math.round(Math.random() * 3)].toFixed(2);
        const volume = Math.round(Math.random() * 100) + 10;
        const turnover = ((open + high + low + close) / 4) * volume;
        dataList.push({ timestamp, open, high, low, close, volume, turnover });

        basePrice = close;
        timestamp += 60 * 1000;
      }
      return dataList;
    }
    const chart = init('chart');
    // {
    //     // 时间戳，毫秒级别，必要字段
    //     timestamp: number
    //     // 开盘价，必要字段
    //     open: number
    //     // 收盘价，必要字段
    //     close: number
    //     // 最高价，必要字段
    //     high: number
    //     // 最低价，必要字段
    //     low: number
    //     // 成交量，非必须字段
    //     volume: number
    //     // 成交额，非必须字段，如果需要展示技术指标'EMV'和'AVP'，则需要为该字段填充数据。
    //     turnover: number
    //   }
    // 1. EMV（Ease of Movement Value）
    // 定义:
    // EMV 是一种将价格与成交量结合起来的技术指标，用于衡量价格变化的轻松程度。它反映了价格变动与成交量之间的关系。
    // EMV = (High+Low)−(Previous High+Previous Low)/Volume
    // High 和 Low: 当前周期的最高价和最低价。
    // Previous High 和 Previous Low: 前一个周期的最高价和最低价。
    // Volume: 当前周期的成交量。
    // 2. AVP（Average Volume Price）
    // 定义:
    // AVP 是一个将价格和成交量结合计算的均值，用于反映每单位成交量的平均交易价格
    // 公式: AVP = 成交量(Volume) / 成交额(Turnover);
    // 成交额（Turnover）: 一段时间内的交易总金额。
    // 成交量（Volume）: 一段时间内的交易总量。
    // 用途:

    // 监测市场中买卖双方的平均成交水平。
    // 高值：市场集中于高价位交易。
    // 低值：市场成交集中于低价位。
    chart?.applyNewData(genData());
    chart?.createIndicator('EMV');
    chart?.createIndicator('AVP', true, { id: 'candle_pane' });

    return () => {
      dispose('chart');
    };
  }, []);
  return <div id="chart" style={{ width: 600, height: 600 }} />;
};
