import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound-inner">
        <span className="big">404</span>
        <h1 className="display-md">Essa prateleira está vazia</h1>
        <p className="lede">
          O endereço que você abriu não existe ou o produto saiu de linha. Volte para a vitrine e
          continue a compra de onde parou.
        </p>
        <div className="row" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">
            Voltar para o início
          </Link>
          <Link href="/mercado" className="btn btn-ghost">
            Ver o mercado
          </Link>
        </div>
      </div>
    </main>
  );
}
