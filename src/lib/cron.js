

async function test(){ 
  const res = await fetch(`${process.env.NEXT_BASE_API}/api/admin/neulink-products`)
  const data = await res.json()
}

test()