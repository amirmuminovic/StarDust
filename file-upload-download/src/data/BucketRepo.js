const { Storage } = require('@google-cloud/storage');
const { join } = require('path');

class StorageBucket {
  constructor({name}) {
    this.name = name;
  }

  async createBucketIfNotExist() {
    const storage = new Storage({credentials: {
      client_email: 'amirsaccount@light-maker-278011.iam.gserviceaccount.com',
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoesG5+jh7bx2V\nrvENMth+yy29sgR8WUaKFAzbF/oGSaBdzclErZF08y2Ufac1CTj6BBuznIl9icQf\n79qJzs/mjEKS8bTgfaaZnVdN1+Pxj4b8kqIZ8v80scWMYaODURT51S7/nL1kxLkM\n9awwURirnyK3MhGDLFTY1JXBi7hCArINW2951DqGf5h4buW0+cqdxy5y2xM55QYm\nDmplAJGKpDioALyQIjNHku/2n4iuAIUkojmKd57N5l4e6lKCg3/HpIBqxbjlqQpY\nsaIGVDD65fzpaZVfUUX00w78uxz4uwgULtVfdprpWPzkZ7DYWKPurc9CgehhZsPj\nRmnAtQERAgMBAAECggEACeJx3Txt9ef1/2MtJ04VX5MCEwAPvU/rkIxOmMgWVioZ\nq4c4SLw6LXda9DxPBBCPdDOrgGUtt9zOUeVbl/w3PFp8SWy+5PDaRmbxyVJiQDjg\nfY8IzabxDCFl6q+LzVeDeIjmYf7LKc9U4ArF2GvZm7ARdFgOqPh/3dzTEHDnFZBE\nd1o4DkfA9ZiXloj+Pc9joOpO+3CX5+XTeK4KPdJ4TewPNiifdYgPPY+qCq60Ton4\nR2PlED0uU+uvtgSdleCK/4kiq2LbvOykENBmTGm2aVT3Ve+XtlNpfXEE23wXrrHO\nBYJM29aZ0GHsVF8k8WfkHUga4ArwdYR9ZiD2Z+7LhQKBgQDh7jk57tIAsKDiPHVJ\n6mHctWhF204OsTigtr1hesxSfMyexmOhagKmeyJfU6V6dgrs2dCkjHnNaOv72KXP\nEbYMFEqOmw+7TCpaEDb6Skaz14KMmpdLymvGyjzAc92e8gJ3xSNtac/EcvfA+nn2\nRnWqbZal+V12qcRKMRCzvxLVgwKBgQC+5xgg3rZgGHrUYvPDr5YrRi+kw4WatKJR\nbVoHQnEXi8mLOByy39jKaQrKZ6vCGfrd6TNsosK5SSWNXxSJIjrI2eRq0axUCOyt\n7CsVq6xcPqk8lO9W+Dm7kGus+mMset7duGtSxyX2SewBgOaEZ1pibDyAj+3hvbJk\nv7OT/bEe2wKBgQCmg9ttlVT16ThKReD0H2kNMC6v/dhj/74KxWSC6eyZhx2QkAty\nNh3J8cr9kzrNLR8UPd0GyfojqIb00VIzcYxJDtN8k1Be7N3yDy1V/1RozBeN5YpI\n8+HHW9q2xS68LQYgnA1mYKwez9VGR9WH65phh++WWFnIUYs4Wz1CHTuWXQKBgFF3\nzZQ5dxsLV1/L2rtn824ERdDKn/mlnJ+jSwhOEnU58oi3KYgsfxfiO/ikxWfQLn8F\nRizWSMNJs/zg1qKvOOb+FbyAPkqehGK0pq5Y1PWIyDBSXtF+nSSuPUVUlX4l8XYt\nfZ+V3V19rnn1yGo4sRnPlwJGaf4sNjVImhpN6YiBAoGBAKeua5bEvOoG/4+K8GMH\nB6nsovIM5mBUroaWokvHD3fCGmxOxjfPsuQe1TJnALK8PZ0cCNOkw+CYQTERELP7\n5U4WuSY4b87jhB/+Ha8Y6vycm0jb96gbAPN6cNOL4C+OQ0TK2LM1ayIZ+IRDT5T2\n8h0tFZmGkIInDiMTBt5r25E3\n-----END PRIVATE KEY-----\n",
    }});
    const bucket = await storage.bucket(this.name);

    if (bucket.exists()) {
      console.log(`Bucket ${this.name} already exists!`);
      this.bucket = bucket;
    } else {
      const newBucket = await storage.createBucket(this.name);
      console.log(`Bucket ${this.name} created.`);
      this.bucket = newBucket;
    }
  }

  async uploadFile(fileName, filePath='./files/neptune.jpg') {
    const response = await this.bucket.upload(filePath, { destination: fileName})
    console.log(response);
  }

  async getFileLinks(prefix) {
    const files = await this.bucket.getFiles({prefix});
    const fileLinks = files[0].map((file) => file.metadata.mediaLink);
    return fileLinks
  }

  async getFiles(prefix) {
    const files = await this.bucket.getFiles({prefix});
    console.log(files[0][0].download)
    await files[0][0].download({destination: join(__dirname, '../files/download.jpg')})
  }
};

module.exports = StorageBucket;
