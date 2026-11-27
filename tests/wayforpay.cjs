const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const assert = require('node:assert/strict');
const { plans, priceAt, promotionDeadline } = require('../lib/pricing.ts');
const { createPurchase, sign, validNotification } = require('../lib/wayforpay.ts');
process.env.WAYFORPAY_SECRET_KEY = 'test-only-key';
for (const plan of plans) {
  assert.equal(priceAt(plan, promotionDeadline - 1), plan.early);
  assert.equal(priceAt(plan, promotionDeadline), plan.full);
  const payment = createPurchase(plan.name, promotionDeadline - 1);
  assert.equal(payment.amount, plan.early);
  assert.equal(payment.merchantSignature, sign([payment.merchantAccount, payment.merchantDomainName, payment.orderReference, payment.orderDate, payment.amount, 'UAH', plan.name, 1, payment.amount]));
  assert.notEqual(createPurchase(plan.name).orderReference, createPurchase(plan.name).orderReference);
}
assert.throws(() => createPurchase('fake'));
process.env.WAYFORPAY_TEST_AMOUNT = '1';
for (const plan of plans) assert.equal(createPurchase(plan.name).amount, 1);
process.env.WAYFORPAY_TEST_AMOUNT = '-1';
assert.throws(() => createPurchase(plans[0].name));
delete process.env.WAYFORPAY_TEST_AMOUNT;
const data = { merchantAccount: 'newmodelway_com', orderReference: createPurchase(plans[0].name).orderReference, amount: 9900, currency: 'UAH', authCode: '123', cardPan: '41****12', transactionStatus: 'Approved', reasonCode: 1100 };
data.merchantSignature = sign(Object.values(data));
assert.equal(validNotification(data), true);
assert.equal(validNotification({ ...data, amount: 1 }), false);
assert.equal(validNotification({ ...data, merchantSignature: 'invalid' }), false);
const example = "test_merchant;www.market.ua;DH783023;1415379863;1547.36;UAH;Процесор Intel Core i5-4670 3.4GHz;Пам'ять Kingston DDR3-1600 4096MB PC3-12800;1;1;1000;547.36";
// The documentation prints an inconsistent (31-character) hash. Verify its exact input independently.
assert.equal(sign(example.split(';'), 'dhkq3vUi94{Z!5frxs(02ML'), require('node:crypto').createHmac('md5', 'dhkq3vUi94{Z!5frxs(02ML').update(example, 'utf8').digest('hex'));
assert.equal(sign(['The quick brown fox jumps over the lazy dog'], 'key'), '80070713463e7749b90c2dc24911e275');
console.log('Passed: deadline, all tariffs, test amount, unique orders, signatures, tampering, official documentation vector.');
