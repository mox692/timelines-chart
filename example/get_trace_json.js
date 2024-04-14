function processEvents(events) {
  // IDによってイベントをグループ化
  const groupedById = events.reduce((acc, event) => {
    if (!acc[event.id]) acc[event.id] = [];
    acc[event.id].push(event);
    return acc;
  }, {});

  // 一番最後の時間を取得
  const lastTime = events.sort((a, b) => b.time - a.time)[0].time;

  // 各グループを処理
  return Object.entries(groupedById).map(([id, events], index) => {
    // イベントを時間順にソート
    events.sort((a, b) => a.time - b.time);

    // データ配列を生成
    const dataEntries = events.map((event, idx) => {
      const nextEvent = events[idx + 1];
      const timeRange = [event.time, nextEvent ? nextEvent.time : lastTime]; // 次のイベントがない場合の仮の処理
      return {
        timeRange,
        val: event.type,
      };
    });

    // 出力フォーマットに合わせる
    return {
      group: `Worker ${index + 1}`,
      data: [
        {
          label: "Label 1",
          data: dataEntries,
        },
      ],
    };
  });
}
