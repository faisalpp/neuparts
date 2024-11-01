

async function test(){ 
  const res = await fetch('http://localhost:3000/api/admin/neulink-products')
  // const res = await fetch(`${process.env.NEXT_BASE_API}/api/admin/neulink-products`)
  const data = await res.json()
}

test()