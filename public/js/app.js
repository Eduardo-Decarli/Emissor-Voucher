document.addEventListener('DOMContentLoaded', () => {
  const hospedeVoucherForm = document.getElementById('hospedeVoucherForm');
  const buscarForm = document.getElementById('buscarForm');
  const resultadoBusca = document.getElementById('resultadoBusca');
  const mensagemDiv = document.getElementById('mensagem');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');

  let currentHospedeId = null; // Variável para armazenar o ID do hóspede atual

  hospedeVoucherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const dataCheckin = document.getElementById('dataCheckin').value;
    const dataCheckout = document.getElementById('dataCheckout').value;
    const validoAte = document.getElementById('validoAte').value;

    try {
      const res = await fetch('/hospedes/addHospedeEVoucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, dataCheckin, dataCheckout, validoAte })
      });
      const data = await res.json();
      if (res.ok) {
        mensagemDiv.innerHTML = `<p>Hóspede e Voucher adicionados com sucesso! ID do Hóspede: ${data.hospede._id}</p>`;
        mensagemDiv.style.color = 'green';
      } else {
        mensagemDiv.innerHTML = `<p>Erro ao adicionar hóspede e voucher: ${data.error}</p>`;
        mensagemDiv.style.color = 'red';
      }
    } catch (error) {
      mensagemDiv.innerHTML = `<p>Erro ao adicionar hóspede e voucher: ${error.message}</p>`;
      mensagemDiv.style.color = 'red';
    }
  });

  buscarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const buscarId = document.getElementById('buscarId').value;

    try {
      const res = await fetch(`/hospedes/buscarHospedeEVoucher/${buscarId}`);
      const data = await res.json();
      if (data.error) {
        resultadoBusca.innerHTML = `<p>${data.error}</p>`;
        resultadoBusca.style.color = 'red';
        downloadPdfBtn.style.display = 'none';
      } else {
        resultadoBusca.innerHTML = `
          <p>Nome: ${data.hospede.nome}</p>
          <p>Email: ${data.hospede.email}</p>
          <p>Telefone: ${data.hospede.telefone}</p>
          <p>Check-in: ${new Date(data.hospede.dataCheckin).toLocaleDateString()}</p>
          <p>Check-out: ${new Date(data.hospede.dataCheckout).toLocaleDateString()}</p>
          <p>Voucher ID: ${data.voucher._id}</p>
          <p>Válido Até: ${new Date(data.voucher.validoAte).toLocaleDateString()}</p>
        `;
        resultadoBusca.style.color = 'black';
        downloadPdfBtn.style.display = 'inline-block';
        currentHospedeId = buscarId; // Armazena o ID do hóspede atual
      }
    } catch (error) {
      resultadoBusca.innerHTML = `<p>Erro ao buscar hóspede e voucher: ${error.message}</p>`;
      resultadoBusca.style.color = 'red';
      downloadPdfBtn.style.display = 'none';
    }
  });

  downloadPdfBtn.addEventListener('click', () => {
    if (currentHospedeId) {
      window.location.href = `/hospedes/gerarPDF/${currentHospedeId}`;
    }
  });
});
