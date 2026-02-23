"use client";

import { useMemo, useState } from "react";

type 案件 = {
  id: string;
  患者番号: string;
  検査ID: string;
  優先度: string;
  連絡手段: string;
  状態: "受付" | "確認中" | "連絡済み";
};

const 初期案件: 案件[] = [
  {
    id: "A-1001",
    患者番号: "P-2026-018",
    検査ID: "LAB-5510",
    優先度: "高",
    連絡手段: "電話",
    状態: "確認中",
  },
  {
    id: "A-1002",
    患者番号: "P-2026-022",
    検査ID: "LAB-5521",
    優先度: "中",
    連絡手段: "SMS",
    状態: "受付",
  },
];

export default function Home() {
  const [患者番号, set患者番号] = useState("");
  const [検査ID, set検査ID] = useState("");
  const [優先度, set優先度] = useState("中");
  const [連絡手段, set連絡手段] = useState("SMS");
  const [案件一覧, set案件一覧] = useState<案件[]>(初期案件);

  const 集計 = useMemo(() => {
    const 受付 = 案件一覧.filter((x) => x.状態 === "受付").length;
    const 確認中 = 案件一覧.filter((x) => x.状態 === "確認中").length;
    const 連絡済み = 案件一覧.filter((x) => x.状態 === "連絡済み").length;
    return { 受付, 確認中, 連絡済み };
  }, [案件一覧]);

  const 追加する = () => {
    if (!患者番号.trim() || !検査ID.trim()) return;
    const id = `A-${String(1000 + 案件一覧.length + 1)}`;
    set案件一覧((prev) => [
      {
        id,
        患者番号: 患者番号.trim(),
        検査ID: 検査ID.trim(),
        優先度,
        連絡手段,
        状態: "受付",
      },
      ...prev,
    ]);
    set患者番号("");
    set検査ID("");
  };

  const 状態更新 = (id: string, 状態: 案件["状態"]) => {
    set案件一覧((prev) => prev.map((x) => (x.id === id ? { ...x, 状態 } : x)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <header className="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-sky-700">CopyCat 向けゼロベース実行MVP</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">検査結果連絡オペレーションMVP</h1>
          <p className="mt-3 text-sm text-slate-600">
            受付→確認キュー→連絡レポートまでの最小フローを日本語UIで検証する実装です。
          </p>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-semibold">1. 受付入力</h2>
            <p className="mt-1 text-xs text-slate-500">新規案件を追加してキューに送ります。</p>

            <div className="mt-4 space-y-3">
              <div className="space-y-1 text-sm">
                <span className="mb-1 block text-slate-700">患者番号</span>
                <input
                  value={患者番号}
                  onChange={(e) => set患者番号(e.target.value)}
                  placeholder="例: P-2026-030"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-sky-300 focus:ring"
                />
              </div>

              <div className="space-y-1 text-sm">
                <span className="mb-1 block text-slate-700">検査ID</span>
                <input
                  value={検査ID}
                  onChange={(e) => set検査ID(e.target.value)}
                  placeholder="例: LAB-5600"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-sky-300 focus:ring"
                />
              </div>

              <div className="space-y-1 text-sm">
                <span className="mb-1 block text-slate-700">優先度</span>
                <select
                  value={優先度}
                  onChange={(e) => set優先度(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-sky-300 focus:ring"
                >
                  <option>高</option>
                  <option>中</option>
                  <option>低</option>
                </select>
              </div>

              <div className="space-y-1 text-sm">
                <span className="mb-1 block text-slate-700">連絡手段</span>
                <select
                  value={連絡手段}
                  onChange={(e) => set連絡手段(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-sky-300 focus:ring"
                >
                  <option>SMS</option>
                  <option>電話</option>
                  <option>メール</option>
                </select>
              </div>

              <button
                onClick={追加する}
                className="w-full rounded-lg bg-sky-700 px-4 py-2 font-medium text-white hover:bg-sky-800"
              >
                受付に追加
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold">2. 確認キュー</h2>
            <p className="mt-1 text-xs text-slate-500">案件の状態を更新して連絡可否を管理します。</p>

            <div className="mt-4 space-y-3">
              {案件一覧.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold">
                      {item.id} / 患者 {item.患者番号} / 検査 {item.検査ID}
                    </p>
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-xs">{item.状態}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    優先度: {item.優先度} / 連絡手段: {item.連絡手段}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => 状態更新(item.id, "確認中")}
                      className="rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-100"
                    >
                      確認中にする
                    </button>
                    <button
                      onClick={() => 状態更新(item.id, "連絡済み")}
                      className="rounded-md border border-emerald-400 px-3 py-1 text-xs text-emerald-700 hover:bg-emerald-50"
                    >
                      連絡済みにする
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">3. 結果レポート</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">受付</p>
              <p className="mt-1 text-2xl font-bold">{集計.受付}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">確認中</p>
              <p className="mt-1 text-2xl font-bold">{集計.確認中}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">連絡済み</p>
              <p className="mt-1 text-2xl font-bold">{集計.連絡済み}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            判定: 連絡済み件数が増えるほど運用効率が改善。次段階では承認履歴と監査ログを接続予定。
          </p>
        </section>
      </main>
    </div>
  );
}
