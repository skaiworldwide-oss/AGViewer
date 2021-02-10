/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class SessionManager {
    constructor() {
        this._sessionMap = new Map();
    }

    put(key, value) {
        this._sessionMap.set(key, value);
    }

    get(key) {
        if(!this._sessionMap.get(key)) {
            return null;
        }
        return this._sessionMap.get(key);
    }
}
const sessionManager = new SessionManager();

module.exports = sessionManager;